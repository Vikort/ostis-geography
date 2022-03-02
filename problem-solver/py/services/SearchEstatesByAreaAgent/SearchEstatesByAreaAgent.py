from termcolor import colored

from common import ScAgent, ScEventParams, ScKeynodes
from sc import *


class SearchEstatesByAreaAgent(ScAgent):
    def __init__(self, module):
        super().__init__(module)
        self.ctx = module.ctx
        self.keynodes = ScKeynodes(self.ctx)
        self.main_node = None

    def RunImpl(self, evt: ScEventParams) -> ScResult:
        self.main_node = evt.other_addr # получаем узел который отвечает за вызов агента с определенными параметрами
        status = ScResult.Ok

        # проверяем что был вызван действительно наш агент
        if self.module.ctx.HelperCheckEdge(
                self.keynodes['action_search_estates_by_area'],
                self.main_node,
                ScType.EdgeAccessConstPosPerm,
        ):
            try:
                if self.main_node is None or not self.main_node.IsValid():
                    raise Exception("The question node isn't valid.")
                # получаем наши аргументы агента
                node = self.get_action_argument(self.main_node, 'rrel_1') 
                answerNode = self.ctx.CreateNode(ScType.NodeConstStruct) # создаем узел ответа
                self.add_nodes_to_answer(answerNode, [node]) # добавляем входные аргументы в ответ

                # Получение всех банков и схожих объектов
                estatesIterator = self.ctx.Iterator5(
                    ScType.Unknown,
                    ScType.EdgeDCommon,
                    node,
                    ScType.EdgeAccessConstPosPerm,
                    self.keynodes['nrel_area']
                )
                while estatesIterator.Next():
                    estate = estatesIterator.Get(0)
                    # проверка на принадлежность к усадьбам
                    estatecheck = False
                    checkIterator = self.ctx.Iterator3(
                        self.keynodes['concept_estates'],
                        ScType.EdgeAccessConstPosPerm,
                        estate
                    )
                    if checkIterator.Next():
                        self.add_nodes_to_answer(answerNode, [estate, estatesIterator.Get(1), estatesIterator.Get(3), estatesIterator.Get(4)])
                    else:
                        print("It is not concept_estates")
                self.finish_agent(self.main_node, answerNode) # завершаем работу агента
            except Exception as ex:
                print(colored(str(ex), color='red'))
                self.set_unsuccessful_status()
                status = ScResult.Error
            finally:
                self.ctx.CreateEdge(
                    ScType.EdgeAccessConstPosPerm,
                    self.keynodes['question_finished'],
                    self.main_node,
                )
        return status

    def set_unsuccessful_status(self):
        self.module.ctx.CreateEdge(
            ScType.EdgeAccessConstPosPerm,
            self.keynodes['question_finished_unsuccessfully'],
            self.main_node,
        )

    def finish_agent(self, action_node, answer):
        contour_edge = self.ctx.CreateEdge(
            ScType.EdgeDCommonConst,
            action_node,
            answer
        )
        self.ctx.CreateEdge(
            ScType.EdgeAccessConstPosPerm,
            self.keynodes['nrel_answer'],
            contour_edge
        )
        self.ctx.CreateEdge(
            ScType.EdgeAccessConstPosPerm,
            self.keynodes['question_finished_successfully'],
            action_node,
        )

    def get_action_argument(self, question: ScAddr, rrel: str, argument_class=None) -> ScAddr:
        actual_argument = "_actual_argument"

        keynodes = self.keynodes

        template = ScTemplate()
        template.TripleWithRelation(
            question,
            ScType.EdgeAccessVarPosPerm,
            ScType.NodeVar >> actual_argument,
            ScType.EdgeAccessVarPosPerm,
            keynodes[rrel],
        )
        if argument_class is not None:
            template.Triple(keynodes[argument_class], ScType.EdgeAccessVarPosPerm, actual_argument)

        search_result = self.ctx.HelperSearchTemplate(template)

        search_result_size = search_result.Size()
        if search_result_size > 0:
            argument_node = search_result[0][actual_argument]
        else:
            raise Exception("The argument node isn't found.")

        return argument_node

    def add_nodes_to_answer(self, contour=None, nodes=None):
        if contour is None:
            contour = self.ctx.CreateNode()
        if nodes is None:
            nodes = []
        for node in nodes:
            self.ctx.CreateEdge(
                ScType.EdgeAccessConstPosPerm,
                contour,
                node
            )