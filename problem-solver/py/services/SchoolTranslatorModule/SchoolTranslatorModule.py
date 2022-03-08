from common import ScModule, ScKeynodes, ScPythonEventType
from SchoolTranslatorExecuteAgent import SchoolTranslatorExecuteAgent

class SchoolTranslatorModule(ScModule):
    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize school translator module')
        question_initiated = self.keynodes['question_initiated']

        agent1 = SchoolTranslatorExecuteAgent(self)

        agent1.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down Driving schools module')


service = SchoolTranslatorModule()
service.Run()