/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include <sc-agents-common/keynodes/coreKeynodes.hpp>
#include <sc-agents-common/utils/IteratorUtils.hpp>
#include <sc-agents-common/utils/AgentUtils.hpp>

#include "keynodes/ParksKeynodes.hpp"

#include "SearchParksByAreaAgent.hpp"

using namespace std;
using namespace utils;
using namespace scAgentsCommon;

namespace parks {

  SC_AGENT_IMPLEMENTATION(SearchParksByAreaAgent)
  {
    if (!edgeAddr.IsValid()) {
      return SC_RESULT_ERROR;
    }

    std::unique_ptr<ParksByPropertyInNumericalRangeFinder>
        parksByPropertyInNumericalRangeFinder =
        std::make_unique<ParksByPropertyInNumericalRangeFinder>();

    ScAddr questionNode = ms_context->GetEdgeTarget(edgeAddr);
    ScAddr answer = parksByPropertyInNumericalRangeFinder->
        findParksByPropertyInNumericalRange(
        ms_context.get(),
        questionNode,
        ParksKeynodes::concept_square,
        ParksKeynodes::nrel_square);

    if (!answer.IsValid()) {
      return SC_RESULT_ERROR_INVALID_PARAMS;
    }

    bool success = ms_context->HelperCheckEdge(ParksKeynodes::concept_success_solution,
                                               answer, ScType::EdgeAccessConstPosPerm);
    AgentUtils::finishAgentWork((ScMemoryContext *) ms_context.get(),
                                questionNode, answer, success);

    return SC_RESULT_OK;
  }
}
