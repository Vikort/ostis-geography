from common import ScAgent, ScEventParams, ScKeynodes
from sc import *


class HolyAgent(ScAgent):

    def RunImpl(self, evt: ScEventParams) -> ScResult:
        print("Holy agent started")
        city = evt.other_addr
        search_area = self.module.ctx.HelperResolveSystemIdtf("nrel_search_area", ScType.NodeConstNorole)
        answer = self.module.ctx.HelperResolveSystemIdtf("HolyAnswer", ScType.NodeConstClass)
        faith = self.module.ctx.HelperResolveSystemIdtf("concept_faith_place", ScType.NodeConstClass)
        if answer.IsValid():
            print("answer valid")

        iterate_city_places = self.module.ctx.Iterator5(city, ScType.EdgeDCommonConst, ScType.NodeConst, ScType.EdgeAccessConstPosPerm, search_area)
        while iterate_city_places.Next():
            print("iterating places")
            iterate_methods = self.module.ctx.Iterator3(faith, ScType.EdgeAccessConstPosPerm, iterate_city_places.Get(2))
            iterate_methods.Next()
            if iterate_methods.IsValid():
                self.module.ctx.CreateEdge(ScType.EdgeAccessConstPosPerm, answer, iterate_methods.Get(2))
        status = ScResult.Ok
        return status
