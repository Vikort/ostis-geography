from common import ScModule, ScKeynodes, ScPythonEventType
from SearchOpenedCinemasAgent import SearchOpenedCinemasAgent

from sc import *


class SearchOpenedCinemasModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchOpenedCinemas module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchOpenedCinemasAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down OpenStreetMap module')


service = SearchOpenedCinemasModule()
service.Run()
