from common import ScModule, ScKeynodes, ScPythonEventType
from SearchTheatersInTheCityAgent import SearchTheatersInTheCityAgent

from sc import *


class SearchTheatersInTheCityModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchTheaterInTheCity module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchTheatersInTheCityAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchTheaterInTheCity module')


service = SearchTheatersInTheCityModule()
service.Run()
