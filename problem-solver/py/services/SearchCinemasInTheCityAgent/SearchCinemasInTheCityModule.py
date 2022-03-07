from common import ScModule, ScKeynodes, ScPythonEventType
from SearchCinemasInTheCityAgent import SearchCinemasInTheCityAgent

from sc import *


class SearchCinemasInTheCityModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchCinemasInTheCity module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchCinemasInTheCityAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchCinemasInTheCity module')


service = SearchCinemasInTheCityModule()
service.Run()
