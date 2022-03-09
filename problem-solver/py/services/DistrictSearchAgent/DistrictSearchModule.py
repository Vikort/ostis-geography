from common import ScModule, ScKeynodes, ScPythonEventType
from DistrictSearchAgent import DistrictSearchAgent

from sc import *


class DistrictSearchAgentModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize DistrictSearchAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = DistrictSearchAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down DistrictSearchAgent module')


service = DistrictSearchAgentModule()
service.Run()
