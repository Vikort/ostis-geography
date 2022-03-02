from common import ScModule, ScKeynodes, ScPythonEventType
from FindCateringOrganizationByDayOfWeekAgent import FindCateringOrganizationByDayOfWeekAgent

from sc import *


class FindCateringOrganizationByDayOfWeekModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindCateringOrganizationByDayOfWeekAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindCateringOrganizationByDayOfWeekAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindCateringOrganizationByDayOfWeekAgent module')


service = FindCateringOrganizationByDayOfWeekModule()
service.Run()
