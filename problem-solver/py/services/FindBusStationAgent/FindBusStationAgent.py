from termcolor import colored

from common import ScAgent, ScEventParams, ScKeynodes
from sc import *


class FindBusStationAgent(ScAgent):
    def __init__(self, module):
        super().__init__(module)
        self.ctx = module.ctx
        self.keynodes = ScKeynodes(self.ctx)
        self.main_node = None


    def RunImpl(self, evt: ScEventParams) -> ScResult:
        self.main_node = evt.other_addr
    
        status = ScResult.Ok

        if self.module.ctx.HelperCheckEdge(
                self.keynodes['action_find_bus_station'],
                self.main_node,
                ScType.EdgeAccessConstPosPerm,
        ):
            try:
                if self.main_node is None or not self.main_node.IsValid():
                    raise Exception("The question node isn't valid.")
                city =  self.get_action_argument(self.main_node, 'rrel_1')

                concept_bus_station = self.module.ctx.HelperResolveSystemIdtf("concept_bus_station", ScType.NodeConstClass)
                answer = self.module.ctx.HelperResolveSystemIdtf("find_bus_station", ScType.NodeConst)
                nrel_city = self.module.ctx.HelperResolveSystemIdtf("nrel_city", ScType.NodeConstNoRole) 
                busStation = self.module.ctx.Iterator3(concept_bus_station, ScType.EdgeAccessConstPosPerm, ScType.NodeConst)
                while busStation.Next():
                    find_station = self.module.ctx.Iterator5(busStation.Get(2), ScType.EdgeDCommonConst, city , ScType.EdgeAccessConstPosPerm, nrel_city) 
                    print(find_station)
                    while find_station.Next():
                        if find_station.IsValid():
                            print('is_valid')
                            self.module.ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, answer, busStation.Get(2))
                            print('created')
            except Exception as e:
                print(e)
        return status

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