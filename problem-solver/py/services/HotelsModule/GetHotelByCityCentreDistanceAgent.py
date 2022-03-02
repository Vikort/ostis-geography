from termcolor import colored

from common import ScAgent, ScEventParams, ScKeynodes
from sc import *
from common.sc_log import Log


class GetHotelByCityCentreDistanceAgent(ScAgent):
    def __init__(self, module):
        super().__init__(module)
        self.ctx = module.ctx
        self.keynodes = ScKeynodes(self.ctx)
        self.main_node = None
        self.log = Log(self.__class__.__name__)

    def RunImpl(self, evt: ScEventParams) -> ScResult:
        self.main_node = evt.other_addr
        status = ScResult.Ok
        self.log.debug("GetHotelByCityCentreDistanceAgent starts")
        if self.module.ctx.HelperCheckEdge(
                self.keynodes['action_get_hotel_by_city_centre_distance'],
                self.main_node,
                ScType.EdgeAccessConstPosPerm,
        ):
            try:
                if self.main_node is None or not self.main_node.IsValid():
                    raise Exception("The question node isn't valid.")
                
                self.log.debug("GetHotelByCityCentreDistanceAgent gets arguments")
                firstDistanceNode = self.get_action_argument(self.main_node, 'rrel_1')
                secondDistanceNode = self.get_action_argument(self.main_node, 'rrel_2') 
                answerNode = self.ctx.CreateNode(ScType.NodeConstStruct)
                self.add_nodes_to_answer(answerNode, [firstDistanceNode, secondDistanceNode])

                hotelDistance = self.get_hotels_with_distance()
                firstDistance = float(self.get_main_idtf(firstDistanceNode))
                secondDistance = float(self.get_main_idtf(secondDistanceNode))

                results = []
                for hotel, distance in hotelDistance.items():
                    if firstDistance <= distance <= secondDistance:
                        print(colored(str(distance), 'green'))
                        results.append(hotel)

                for hotel in results:
                    self.log.debug("GetHotelByCityCentreDistanceAgent gets answer")
                    self.add_hotel_to_answer(hotel, answerNode)
            
                self.finish_agent(self.main_node, answerNode)
                self.log.debug("GetHotelByCityCentreDistanceAgent ends")
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

    def finish_agent(self, action_node, answer):
        contour_edge = self.ctx.CreateEdge(
            ScType.EdgeDCommonConst,
            action_node,
            answer
        )
        self.ctx.CreateEdge(
            ScType.EdgeAccessConstPosPerm,
            self.keynodes['nrel_answer'],
            contour_edge
        )
        self.ctx.CreateEdge(
            ScType.EdgeAccessConstPosPerm,
            self.keynodes['question_finished_successfully'],
            action_node,
        )

    def get_action_argument(self, question: ScAddr, rrel: str, argument_class=None) -> ScAddr:
        actual_argument = "_actual_argument"

        template = ScTemplate()
        template.TripleWithRelation(
            question,
            ScType.EdgeAccessVarPosPerm,
            ScType.NodeVar >> actual_argument,
            ScType.EdgeAccessVarPosPerm,
            self.keynodes[rrel],
        )
        if argument_class is not None:
            template.Triple(keynodes[argument_class], ScType.EdgeAccessVarPosPerm, actual_argument)

        search_result = self.ctx.HelperSearchTemplate(template)

        search_result_size = search_result.Size()
        if search_result_size > 0:
            argument_node = search_result[0][actual_argument]
        else:
            raise Exception("The argument node isn't found.")

        return argument_node

    def add_nodes_to_answer(self, contour=None, nodes=None):
        if contour is None:
            contour = self.ctx.CreateNode()
        if nodes is None:
            nodes = []
        for node in nodes:
            self.ctx.CreateEdge(
                ScType.EdgeAccessConstPosPerm,
                contour,
                node
            )

    def add_hotel_to_answer(self, hotel, answer):
        template = ScTemplate()
        template.TripleWithRelation(
            hotel,
            ScType.EdgeDCommonVar >> "_arc_1",
            ScType.LinkVar >> '_distance',
            ScType.EdgeAccessVarPosPerm >> "_arc_2",
            self.keynodes['nrel_city_centre_distance'],
        )
        search_result = self.ctx.HelperSearchTemplate(template)

        if search_result.Size():
            self.add_nodes_to_answer(answer,
             [
                hotel,
                self.keynodes['nrel_city_centre_distance'],
                search_result[0]['_arc_1'],
                search_result[0]['_arc_2'],
                search_result[0]['_distance']
            ]
            )

    def get_hotels_with_distance(self):
        template = ScTemplate()
        template.Triple(
            self.keynodes['concept_hotel'],
            ScType.EdgeAccessVarPosPerm,
            ScType.NodeVar >> '_hotel'
        )
        template.TripleWithRelation(
            '_hotel',
            ScType.EdgeDCommonVar,
            ScType.LinkVar >> '_distance',
            ScType.EdgeAccessVarPosPerm,
            self.keynodes['nrel_city_centre_distance'],
        )

        search_result = self.ctx.HelperSearchTemplate(template)
        hotels_with_distance = {}
        if search_result.Size():
            for i in range(search_result.Size()):
                hotels_with_distance[search_result[i]['_hotel']] = float(self.ctx.GetLinkContent(search_result[i]['_distance']).AsString())
        return hotels_with_distance

    def get_main_idtf(self, node):
        template = ScTemplate()
        template.TripleWithRelation(
            node,
            ScType.EdgeDCommonVar,
            ScType.LinkVar >> 'value',
            ScType.EdgeAccessVarPosPerm,
            self.keynodes['nrel_main_idtf']
        )
        template_result = self.ctx.HelperSearchTemplate(template)
        value = ''
        if template_result.Size():
            value = self.ctx.GetLinkContent(template_result[0]['value']).AsString()
        return value
