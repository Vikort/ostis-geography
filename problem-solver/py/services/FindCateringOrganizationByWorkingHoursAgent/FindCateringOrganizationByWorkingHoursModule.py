from common import ScModule, ScKeynodes, ScPythonEventType
from FindCateringOrganizationByWorkingHoursAgent import FindCateringOrganizationByWorkingHoursAgent

from sc import *


class FindCateringOrganizationByWorkingHoursModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindCateringOrganizationByWorkingHoursAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindCateringOrganizationByWorkingHoursAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindCateringOrganizationByWorkingHoursAgent module')


service = FindCateringOrganizationByWorkingHoursModule()
service.Run()
