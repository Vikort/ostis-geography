from common import ScModule, ScKeynodes, ScPythonEventType
from FindSecondarySpecialSchoolsPoOpenYearAgent import FindSecondarySpecialSchoolsPoOpenYearAgent

from sc import *


class FindSecondarySpecialSchoolsPoOpenYearModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindSecondarySpecialSchoolsPoOpenYearAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindSecondarySpecialSchoolsPoOpenYearAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindSecondarySpecialSchoolsPoOpenYearAgent module')


service = FindSecondarySpecialSchoolsPoOpenYearModule()
service.Run()
