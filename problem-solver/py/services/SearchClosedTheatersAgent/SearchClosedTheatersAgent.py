from termcolor import colored

from common import ScAgent, ScEventParams, ScKeynodes
from sc import *

osm_level_to_tag = {
    '2': ['addr:city', 'addr:district', 'addr:region'],
    '4': ['addr:city', 'addr:district', 'addr:region'],
    '6': ['addr:city', 'addr:district'],
    '8': ['addr:city'],
    '9': ['addr:country', 'addr:district', 'addr:region'],
    '10': ['addr:city'],
    None: ['addr:country', 'addr:district', 'addr:region', 'addr:city']
}

class SearchClosedTheatersAgent(ScAgent):
    def __init__(self, module):
        super().__init__(module)
        self.ctx = module.ctx
        self.keynodes = ScKeynodes(self.ctx)
        self.main_node = None


    def RunImpl(self, evt: ScEventParams) -> ScResult:
        self.main_node = evt.other_addr
    
        status = ScResult.Ok

        if self.module.ctx.HelperCheckEdge(
                self.keynodes['action_search_closed_theaters'],
                self.main_node,
                ScType.EdgeAccessConstPosPerm,
        ):
            try:
                if self.main_node is None or not self.main_node.IsValid():
                    raise Exception("The question node isn't valid.")
                city =  self.get_action_argument(self.main_node, 'rrel_1')

                concept_theater = self.module.ctx.HelperResolveSystemIdtf("concept_theatre", ScType.NodeConstClass)
                answer = self.module.ctx.HelperResolveSystemIdtf("find_cinema", ScType.NodeConst)
                nrel_city = self.module.ctx.HelperResolveSystemIdtf("nrel_status", ScType.NodeConstNoRole)
                theater = self.module.ctx.Iterator3( concept_theater, ScType.EdgeAccessConstPosPerm, ScType.NodeConst)
                while theater.Next():
                    print("sss")
                    find_theater = self.module.ctx.Iterator5(theater.Get(2), ScType.EdgeDCommonConst, city , ScType.EdgeAccessConstPosPerm, nrel_city)
                    print(find_theater)
                    while find_theater.Next():
                        if find_theater.IsValid():
                            print('is_valid')
                            self.module.ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, answer, theater.Get(2))
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

   
