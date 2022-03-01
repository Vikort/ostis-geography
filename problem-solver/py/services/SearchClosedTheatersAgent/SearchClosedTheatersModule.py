from common import ScModule, ScKeynodes, ScPythonEventType
from SearchClosedTheatersAgent import SearchClosedTheatersAgent

from sc import *


class SearchClosedTheatersModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchClosedTheaters module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchClosedTheatersAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchClosedTheaters module')


service = SearchClosedTheatersModule()
service.Run()
