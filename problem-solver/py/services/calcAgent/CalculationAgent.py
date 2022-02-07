from common import ScModule, ScAgent, ScEventParams
from sc import *
import math


def convertToNumber(num, string):
    number = float(num)
    if string[0] == 'k':
        number = number * 1000
    if string[0] == 'M':
        number = number * 1000000
    if string[0] == 'G':
        number = number * 1000000000
    if string[0] == 'T':
        number = number * 1000000000000

    if string[0] == 'm':
        number = number / 1000
    if string[0] == 'u':
        number = number / 1000000
    if string[0] == 'n':
        number = number / 1000000000
    if string[0] == 'p':
        number = number / 1000000000000
    return number


def convertToValue(number):
    value = str(int(number))
    if number > 1:
        if number > 100000000000000:
            value = str(int(number / 1000000000000))
            value += "_T"
            return str(value)
        if number > 100000000000:
            value = str(int(number / 1000000000))
            value += "_G"
            return str(value)
        if number > 100000000:
            value = str(int(number / 1000000))
            value += "_M"
            return str(value)
        if number > 100000:
            value = str(int(number / 1000))
            value += "_k"
            return str(value)

    if number < 1:
        if (number * 1000) % 1 == 0:
            value = str(int(number * 1000))
            value += "_m"
            return str(value)
        if (number * 1000000) % 1 == 0:
            value = str(int(number * 1000000))
            value += "_u"
            return str(value)
        if (number * 1000000000) % 1 == 0:
            value = str(int(number * 1000000000))
            value += "_n"
            return str(value)
        if (number * 1000000000000) % 1 == 0:
            value = str(int(number * 1000000000000))
            value += "_p"
            return str(value)
    return value + "_"


class CalculationAgent(ScAgent):

    def RunImpl(self, evt: ScEventParams) -> ScResult:
        ctx = ScMemoryContext.Create("ctx")
        question = ctx. \
            HelperResolveSystemIdtf("question_to_calculation_schemes",
                                    ScType.NodeConst)
        constHelperElement = ctx. \
            HelperResolveSystemIdtf("rrel_radioelectronics_core_element_pointer", ScType.NodeConst)
        its = ctx.Iterator3(question, ScType.EdgeAccessConstPosPerm, ScType.NodeConst)
        its.Next()
        circuit = its.Get(2)
        it = ctx.Iterator5(circuit,
                            ScType.EdgeAccessConstPosPerm,
                            ScType.NodeConst,
                            ScType.EdgeAccessConstPosPerm,
                            constHelperElement)
        parametrsList = {}
        targetSet = None
        while it.Next():
            targetSet = it.Get(2)
            if targetSet.IsValid():
                print("Set founded")
                ind = "inductance"
                cap = "capacity"
                parametersIt = ctx. \
                    Iterator3(targetSet,
                              ScType.EdgeAccessConstPosPerm,
                              ScType.NodeConst)
                while parametersIt.Next():
                    print("Parameter founded")
                    element = parametersIt.Get(2)
                    inductance = ctx. \
                        HelperResolveSystemIdtf("nrel_inductance",
                                                ScType.NodeConstNoRole)
                    inductanceIt = ctx.Iterator5(element,
                                                 ScType.EdgeDCommonConst,
                                                 ScType.NodeConst,
                                                 ScType.EdgeAccessConstPosPerm,
                                                 inductance)
                    # Обработка и сохранение параметра индуктивности
                    while inductanceIt.Next():
                        buf = inductanceIt.Get(2)
                        if buf != None:
                            print("Inductance founded:")
                            inductanceValue = ctx.HelperGetSystemIdtf(buf)
                            print(inductanceValue)
                            value = inductanceValue.split('_')
                            number = convertToNumber(value[0], value[1])
                            if ind in parametrsList:
                                parametrsList[ind] = (parametrsList[ind] + number) / 2
                                print(str(parametrsList[ind]))
                            else:
                                parametrsList[ind] = number
                                print(str(parametrsList[ind]))
                    # Поиск параметра емкости у элемента
                    capacity = ctx. \
                        HelperResolveSystemIdtf("nrel_capacity",
                                                ScType.NodeConstNoRole)
                    capacityIt = ctx.Iterator5(element,
                                               ScType.EdgeDCommonConst,
                                               ScType.NodeConst,
                                               ScType.EdgeAccessConstPosPerm,
                                               capacity)
                    # Обработка и сохранение параметра емкости
                    while capacityIt.Next():
                        buf = capacityIt.Get(2)
                        if buf != None:
                            print("Capacity founded:")
                            capacityValue = ctx.HelperGetSystemIdtf(buf)
                            print(capacityValue)
                            value = capacityValue.split('_')
                            number = convertToNumber(value[0], value[1])
                            if cap in parametrsList:
                                parametrsList[cap] = (parametrsList[cap] + number) / 2
                                print(str(parametrsList[cap]))
                            else:
                                parametrsList[cap] = number
                                print(str(parametrsList[cap]))
                print(parametrsList)
                # Вычисление сопротивления и частоты среза
                if cap in parametrsList and ind in parametrsList:
                    R = convertToValue(math.sqrt(parametrsList[ind] / parametrsList[cap])) + "Om"
                    F = convertToValue(1 / (3.14 * math.sqrt(parametrsList[ind] * parametrsList[cap]))) + "Hz"
                    print(R)
                    print(F)
                else:
                    print("Not enough parametrs")
                    return ScResult.Ok
                # Добавление новых данных в OSTIS
                # Создание и идентифицирование нодов
                value = ctx.HelperResolveSystemIdtf("value",
                                                    ScType.NodeConst)
                nodeResistance = ctx.HelperResolveSystemIdtf(R,
                                                    ScType.NodeConst)
                nodeFrequency = ctx.HelperResolveSystemIdtf(F,
                                                    ScType.NodeConst)
                if not nodeResistance.IsValid():
                    nodeResistance = ctx.CreateNode(ScType.NodeConst)
                    ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, value, nodeResistance)
                if not nodeFrequency.IsValid():
                    nodeFrequency = ctx.CreateNode(ScType.NodeConst)
                    ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, value, nodeFrequency)
                ctx.HelperSetSystemIdtf(R, nodeResistance)
                ctx.HelperSetSystemIdtf(F, nodeFrequency)
                # Поиск необходимых отношений
                resistance = ctx.HelperResolveSystemIdtf("nrel_rated_resistance",
                                                ScType.NodeConstNoRole)
                frequency = ctx.HelperResolveSystemIdtf("nrel_frequency",
                                                ScType.NodeConstNoRole)
                # Связь scheme=>node
                targetEdgeResistance = ctx.CreateEdge(ScType.EdgeDCommonConst, circuit, nodeResistance)
                targetEdgeFrequency = ctx.CreateEdge(ScType.EdgeDCommonConst, circuit, nodeFrequency)
                # Связь scheme=>nrel_type:node
                ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, resistance, targetEdgeResistance)
                ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, frequency, targetEdgeFrequency)
            else:
                print("Set not found")
                return ScResult.Ok
        return ScResult.Ok