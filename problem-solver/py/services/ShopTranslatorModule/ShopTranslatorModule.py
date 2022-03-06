from common import ScModule, ScKeynodes, ScPythonEventType
from ShopTranslatorExecuteAgent import ShopTranslatorExecuteAgent

class ShopTranslatorModule(ScModule):
    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize shop translator module')
        question_initiated = self.keynodes['question_initiated']

        agent1 = ShopTranslatorExecuteAgent(self)

        agent1.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        print('Initialize shop translator module completed')
    def OnShutdown(self):
        print('Shutting down Driving schools module')


service = ShopTranslatorModule()
service.Run()