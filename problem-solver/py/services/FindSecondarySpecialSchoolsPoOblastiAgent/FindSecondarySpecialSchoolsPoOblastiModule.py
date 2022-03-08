from common import ScModule, ScKeynodes, ScPythonEventType
from FindSecondarySpecialSchoolsPoOblastiAgent import FindSecondarySpecialSchoolsPoOblastiAgent

from sc import *


class FindSecondarySpecialSchoolsPoOblastiModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindSecondarySpecialSchoolsPoOblastiAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindSecondarySpecialSchoolsPoOblastiAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindSecondarySpecialSchoolsPoOblastiAgent module')


service = FindSecondarySpecialSchoolsPoOblastiModule()
service.Run()
