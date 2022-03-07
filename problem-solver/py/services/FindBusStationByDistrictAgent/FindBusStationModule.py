from common import ScModule, ScKeynodes, ScPythonEventType
from FindBusStationByDistrictAgent import FindBusStationByDistrictAgent

from sc import *


class FindBusStationByDistrictModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize FindBusStationByDistrict module')
        question_initiated = self.keynodes['question_initiated']

        agent = FindBusStationByDistrictAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down FindBusStationByDistrict module')


service = FindBusStationByDistrictModule()
service.Run()