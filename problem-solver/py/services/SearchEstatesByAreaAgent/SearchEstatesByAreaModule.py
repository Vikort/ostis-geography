from common import ScModule, ScKeynodes, ScPythonEventType
from SearchEstatesByAreaAgent import SearchEstatesByAreaAgent # импорт агента

from sc import *


class SearchEstatesByAreaModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchEstatesByArea module') # меняем название модуля для логов
        question_initiated = self.keynodes['question_initiated']

        agent = SearchEstatesByAreaAgent(self) # меняем SearchEstatesByAreaAgent на свой, по аналогии можно добавлять больше агентов
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchEstatesByArea module') # меняем название модуля для логов


service = SearchEstatesByAreaModule()
service.Run()