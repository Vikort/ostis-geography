from common import ScModule, ScKeynodes, ScPythonEventType
from SearchShopsInTheDistrictAgent import SearchShopsInTheDistrictAgent

from sc import *


class SearchShopsInTheDistrictModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchShopsInTheDistrict module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchShopsInTheDistrictAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchShopsInTheDistrict module')


service = SearchShopsInTheDistrictModule()
service.Run()
