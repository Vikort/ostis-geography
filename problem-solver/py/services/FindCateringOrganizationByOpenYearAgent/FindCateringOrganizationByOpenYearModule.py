from common import ScModule, ScKeynodes, ScPythonEventType
from FindCateringOrganizationByOpenYearAgent import FindCateringOrganizationByOpenYearAgent

from sc import *


class FindCateringOrganizationByOpenYearModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindCateringOrganizationByOpenYearAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindCateringOrganizationByOpenYearAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindCateringOrganizationByOpenYearAgent module')


service = FindCateringOrganizationByOpenYearModule()
service.Run()
