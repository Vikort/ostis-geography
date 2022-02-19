from common import ScModule, ScKeynodes, ScPythonEventType
from FindSecondarySpecialSchoolsPoCityAgent import FindSecondarySpecialSchoolsPoCityAgent

from sc import *


class FindSecondarySpecialSchoolsPoCityModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindSecondarySpecialSchoolsPoCityAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindSecondarySpecialSchoolsPoCityAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindSecondarySpecialSchoolsPoCityAgent module')


service = FindSecondarySpecialSchoolsPoCityModule()
service.Run()
