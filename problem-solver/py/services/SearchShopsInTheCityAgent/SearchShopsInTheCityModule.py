from common import ScModule, ScKeynodes, ScPythonEventType
from SearchShopsInTheCityAgent import SearchShopInTheCityAgent

from sc import *


class SearchShopInTheCityAgentModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize SearchShopInTheCityAgent module')
        question_initiated = self.keynodes['question_initiated']

        agent = SearchShopInTheCityAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down SearchShopInTheCityAgent module')


service = SearchShopInTheCityAgentModule()
service.Run()
