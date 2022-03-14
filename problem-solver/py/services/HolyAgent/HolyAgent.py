from common import ScAgent, ScEventParams, ScKeynodes
from sc import *


class HolyAgent(ScAgent):
    def __init__(self, module):
        super().__init__(module)
        self.ctx = module.ctx
        self.keynodes = ScKeynodes(self.ctx)
        self.main_node = None

    def RunImpl(self, evt: ScEventParams) -> ScResult:
        print("Holy agent started")
        self.main_node = evt.other_addr
        status = ScResult.Ok

        if not self.module.ctx.HelperCheckEdge(
                self.keynodes['action_holy_find'],
                self.main_node,
                ScType.EdgeAccessConstPosPerm,
        ):
            return

        print("HolyAgent activated")
        search_area = self.module.ctx.HelperResolveSystemIdtf("nrel_city", ScType.NodeConstNorole)
        answer = self.module.ctx.HelperResolveSystemIdtf("HolyAnswer", ScType.NodeConstClass)
        faith = self.module.ctx.HelperResolveSystemIdtf("concept_faith_place", ScType.NodeConstClass)
        if answer.IsValid():
            print("answer valid")

        iterate_city_places = self.module.ctx.Iterator5(self.main_node, ScType.EdgeDCommonConst, ScType.NodeConst, ScType.EdgeAccessConstPosPerm, search_area)
        while iterate_city_places.Next():
            print("iterating places")
            iterate_methods = self.module.ctx.Iterator3(faith, ScType.EdgeAccessConstPosPerm, iterate_city_places.Get(2))
            iterate_methods.Next()
            if iterate_methods.IsValid():
                self.module.ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, answer, iterate_methods.Get(2))
        status = ScResult.Ok
        return status
