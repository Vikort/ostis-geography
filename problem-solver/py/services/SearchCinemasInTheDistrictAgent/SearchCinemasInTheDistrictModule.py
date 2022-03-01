from common import ScModule, ScKeynodes, ScPythonEventType
from SearchCinemasInTheDistrictAgent import SearchCinemasInTheDistrictAgent

from sc import *


class SearchCinemasInTheDistrictModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchCinemasInTheDistrict module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchCinemasInTheDistrictAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchCinemasInTheDistrict module')


service = SearchCinemasInTheDistrictModule()
service.Run()
