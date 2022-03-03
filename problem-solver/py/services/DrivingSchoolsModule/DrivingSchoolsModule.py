from common import ScModule, ScKeynodes, ScPythonEventType
from GetDrivingSchoolsByRegionAgent import GetDrivingSchoolsByRegionAgent
from GetDrivingSchoolsByDistrictAgent import GetDrivingSchoolsByDistrictAgent
from GetDrivingSchoolsByCityAgent import GetDrivingSchoolsByCityAgent
from GetDrivingSchoolsByStreetAgent import GetDrivingSchoolsByStreetAgent
from GetDrivingSchoolsByFailureRateAgent import GetDrivingSchoolsByFailureRateAgent
from GetDrivingSchoolsByRatingAgent import GetDrivingSchoolsByRatingAgent

from sc import *


class DrivingSchoolsModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize Driving schools module')
        question_initiated = self.keynodes['question_initiated']

        agent1 = GetDrivingSchoolsByRegionAgent(self)
        agent2 = GetDrivingSchoolsByDistrictAgent(self)
        agent3 = GetDrivingSchoolsByCityAgent(self)
        agent4 = GetDrivingSchoolsByStreetAgent(self)
        agent5 = GetDrivingSchoolsByFailureRateAgent(self)
        agent6 = GetDrivingSchoolsByRatingAgent(self)

        agent1.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent2.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent3.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent4.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent5.Register(question_initiated, ScPythonEventType.AddOutputEdge)
        agent6.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down Driving schools module')


service = DrivingSchoolsModule()
service.Run()
