from common import ScModule, ScKeynodes, ScPythonEventType
from CountAverageAgent import CountAverageAgent # импорт агента


from sc import *


class CountAverageModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize CountAverageModule') # меняем название модуля для логов
        question_initiated = self.keynodes['question_initiated']

        agent = CountAverageAgent(self) # меняем GetDefinitionAgent на свой, по аналогии можно добавлять больше агентов
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down CountAverageModule') # меняем название модуля для логов


service = CountAverageModule()
service.Run()
