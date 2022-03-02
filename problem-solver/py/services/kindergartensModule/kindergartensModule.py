from common import ScModule, ScKeynodes, ScPythonEventType
from GetKindergartensByTypeAgent import GetKindergartensByTypeAgent # импорт агента
from GetKindergartensByAmountLessAgent import GetKindergartensByAmountLessAgent
from GetKindergartensByCityAgent import GetKindergartensByCityAgent
from GetKindergartensByAmountGreaterAgent import GetKindergartensByAmountGreaterAgent
from GetKindergartensByDistrictAgent import GetKindergartensByDistrictAgent
from GetKindergartensByStreetAgent import GetKindergartensByStreetAgent
from GetKindergartensByRegionAgent import GetKindergartensByRegionAgent
from GetKindergartensByOpenTimeAgent import GetKindergartensByOpenTimeAgent
from GetKindergartensByCloseTimeAgent import GetKindergartensByCloseTimeAgent

from sc import *


class ExampleModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize Kindergartens module')
        question_initiated = self.keynodes['question_initiated']

        agent1 = GetKindergartensByTypeAgent(self)
        agent2 = GetKindergartensByAmountLessAgent(self)
        agent3 = GetKindergartensByCityAgent(self)

        agent4 = GetKindergartensByAmountGreaterAgent(self)
        agent5 = GetKindergartensByDistrictAgent(self)
        agent6 = GetKindergartensByStreetAgent(self)

        agent7 = GetKindergartensByRegionAgent(self)
        agent8 = GetKindergartensByOpenTimeAgent(self)
        agent9 = GetKindergartensByCloseTimeAgent(self)


        agent1.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent2.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent3.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent4.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent5.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent6.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent7.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent8.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent9.Register(question_initiated, ScPythonEventType.AddOutputEdge)


    def OnShutdown(self):
        print('Shutting down Example module')


service = ExampleModule()
service.Run()
