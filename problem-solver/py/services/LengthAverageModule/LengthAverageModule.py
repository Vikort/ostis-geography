from common import ScModule, ScKeynodes, ScPythonEventType
from LengthAverageAgent import LengthAverageAgent # импорт агента


from sc import *


class LengthAverageModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize LengthAverageModule') # меняем название модуля для логов
        question_initiated = self.keynodes['question_initiated']

        agent = LengthAverageAgent(self) # меняем GetDefinitionAgent на свой, по аналогии можно добавлять больше агентов
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down LengthAverageModule') # меняем название модуля для логов


service = LengthAverageModule()
service.Run()
