from common import ScModule, ScKeynodes, ScPythonEventType
from HolyAgent import HolyAgent

from sc import *


class HolyModule(ScModule):

    def __init__(self):
        ScModule.__init__(
            self,
            ctx=__ctx__,
            cpp_bridge=__cpp_bridge__,
            keynodes=[],
        )
        self.keynodes = ScKeynodes(self.ctx)

    def OnInitialize(self, params):
        print('Initialize Holy module')
        start = self.keynodes['Holy_question']

        agent = HolyAgent(self)
        agent.Register(start, ScPythonEventType.AddOutputEdge)

    def OnShutdown(self):
        start = self.ctx.HelperResolveSystemIdtf('Holy_question', ScType.NodeConstClass)
        self.ctx.DeleteElement(start)
        print('Shutting down Holy module')


service = HolyModule()
service.Run()
