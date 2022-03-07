from common import ScModule, ScKeynodes, ScPythonEventType
from GetVillagesByRegionAgent import GetVillagesByRegionAgent
from GetVillagesByDistrictAgent import GetVillagesByDistrictAgent
from GetVillagesBySelsovietAgent import GetVillagesBySelsovietAgent

from sc import *


class VillagesModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize Villages module')
        question_initiated = self.keynodes['question_initiated']

        agent1 = GetVillagesByRegionAgent(self)
        agent2 = GetVillagesByDistrictAgent(self)
        agent3 = GetVillagesBySelsovietAgent(self)

        agent1.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent2.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent3.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down Villages module')


service = VillagesModule()
service.Run()
