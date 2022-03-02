from common import ScModule, ScKeynodes, ScPythonEventType
from LibraryAgent import LibraryAgent # импорт агента


from sc import *


class LibraryModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize LibraryModule') # меняем название модуля для логов
        question_initiated = self.keynodes['question_initiated']

        agent = LibraryAgent(self) # меняем GetDefinitionAgent на свой, по аналогии можно добавлять больше агентов
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down LibraryModule') # меняем название модуля для логов


service = LibraryModule()
service.Run()
