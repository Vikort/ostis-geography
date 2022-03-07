from common import ScModule, ScKeynodes, ScPythonEventType
from FindBusStationAgent import FindBusStationAgent

from sc import *


class FindBusStationModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindBusStation module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindBusStationAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindBusStation module')


service = FindBusStationModule()
service.Run()