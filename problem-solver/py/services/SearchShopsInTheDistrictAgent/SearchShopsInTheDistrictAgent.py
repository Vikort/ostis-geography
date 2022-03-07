from termcolor import colored

from common import ScAgent, ScEventParams, ScKeynodes
from sc import *


class SearchShopsInTheDistrictAgent(ScAgent):
    def __init__(self, module):
        super().__init__(module)
        self.ctx = module.ctx
        self.keynodes = ScKeynodes(self.ctx)
        self.main_node = None


    def RunImpl(self, evt: ScEventParams) -> ScResult:
        self.main_node = evt.other_addr

        status = ScResult.Ok

        if self.module.ctx.HelperCheckEdge(
                self.keynodes['action_search_cinemas_in_the_district'],
                self.main_node,
                ScType.EdgeAccessConstPosPerm,
        ):
            try:
                if self.main_node is None or not self.main_node.IsValid():
                    raise Exception("The question node isn't valid.")
                district =  self.get_action_argument(self.main_node, 'rrel_1')

                concept_shop = self.module.ctx.HelperResolveSystemIdtf("concept_shop", ScType.NodeConstClass)
                answer = self.module.ctx.HelperResolveSystemIdtf("find_shop_by_district", ScType.NodeConst)
                nrel_district = self.module.ctx.HelperResolveSystemIdtf("nrel_district", ScType.NodeConstNoRole)
                shop = self.module.ctx.Iterator3( concept_shop, ScType.EdgeAccessConstPosPerm, ScType.NodeConst)
                while shop.Next():
                    print("sss")
                    find_shop = self.module.ctx.Iterator5(shop.Get(2), ScType.EdgeDCommonConst, district , ScType.EdgeAccessConstPosPerm, nrel_district)
                    print(find_shop)
                    while find_shop.Next():
                        if find_shop.IsValid():
                            print('is_valid')
                            self.module.ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, answer, shop.Get(2))
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


