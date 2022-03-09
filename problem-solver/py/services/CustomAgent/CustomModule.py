from common import ScModule, ScKeynodes, ScPythonEventType
from OpenStreetMapAgent import OpenStreetMapAgent
import os
from sc import *


class CustomModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        os.system('pip install -r ../../tools/street_translator/requirements.txt')
        print('Initialize StreetsTranslator module')
        question_initiated = self.keynodes['question_initiated']

        agent = OpenStreetMapAgent(self)
        agent.Register(question_initiated, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        print('Shutting down StreetsTranslator module')


service = CustomModule()
service.Run()
