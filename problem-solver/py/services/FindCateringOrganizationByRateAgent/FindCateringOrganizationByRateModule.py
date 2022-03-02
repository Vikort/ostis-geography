from common import ScModule, ScKeynodes, ScPythonEventType
from FindCateringOrganizationByRateAgent import FindCateringOrganizationByRateAgent

from sc import *


class FindCateringOrganizationByRateModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindCateringOrganizationByRateAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindCateringOrganizationByRateAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindCateringOrganizationByRateAgent module')


service = FindCateringOrganizationByRateModule()
service.Run()
