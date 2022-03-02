from common import ScModule, ScKeynodes, ScPythonEventType
from FoundationYearAgent import FoundationYearAgent # импорт агента


from sc import *


class FoundationYearModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FoundationYearModule') # меняем название модуля для логов
        question_initiated = self.keynodes['question_initiated']

        agent = FoundationYearAgent(self) # меняем GetDefinitionAgent на свой, по аналогии можно добавлять больше агентов
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FoundationYearModule') # меняем название модуля для логов


service = FoundationYearModule()
service.Run()
