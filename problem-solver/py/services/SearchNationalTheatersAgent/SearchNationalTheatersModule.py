from common import ScModule, ScKeynodes, ScPythonEventType
from SearchNationalTheatersAgent import SearchNationalTheatersAgent

from sc import *


class SearchNationalTheatersModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchNationalTheaters module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchNationalTheatersAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchNationalTheaters module')


service = SearchNationalTheatersModule()
service.Run()
