from common import ScModule, ScKeynodes, ScPythonEventType
from FindCateringOrganizationByPriceCategoryAgent import FindCateringOrganizationByPriceCategoryAgent

from sc import *


class FindCateringOrganizationByPriceCategoryModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindCateringOrganizationByPriceCategoryAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindCateringOrganizationByPriceCategoryAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindCateringOrganizationByPriceCategoryAgent module')


service = FindCateringOrganizationByPriceCategoryModule()
service.Run()
