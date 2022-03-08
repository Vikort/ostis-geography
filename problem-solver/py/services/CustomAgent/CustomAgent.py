import os

from termcolor import colored

from common import ScAgent, ScEventParams, ScKeynodes
from sc import *




class CustomAgent(ScAgent):
    def __init__(self, module):
        super().__init__(module)
        self.ctx = module.ctx
        self.keynodes = ScKeynodes(self.ctx)
        self.main_node = None

    def RunImpl(self, evt: ScEventParams) -> ScResult:
        self.main_node = evt.other_addr
        status = ScResult.Ok

        if self.module.ctx.HelperCheckEdge(
                self.keynodes['action_run_translator'],
                self.main_node,
                ScType.EdgeAccessConstPosPerm,
        ):
            try:
                print('Running translator...')
                os.system("python3 ../../tools/street_translator/translator.py")
            except Exception as ex:
                print(colored(str(ex), color='red'))
                self.set_unsuccessful_status()
                status = ScResult.Error
            finally:
                self.ctx.CreateEdge(
                    ScType.EdgeAccessConstPosPerm,
                    self.keynodes['question_finished'],
                    self.main_node,
                )
        return status

    def set_unsuccessful_status(self):
        self.module.ctx.CreateEdge(
            ScType.EdgeAccessConstPosPerm,
            self.keynodes['question_finished_unsuccessfully'],
            self.main_node,
        )


