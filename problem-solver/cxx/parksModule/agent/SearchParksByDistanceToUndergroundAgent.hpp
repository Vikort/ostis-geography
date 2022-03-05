/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#pragma once

#include <sc-memory/kpm/sc_agent.hpp>
#include "keynodes/ParksKeynodes.hpp"
#include "search/ParksByPropertyInNumericalRangeFinder.hpp"
#include <memory>

#include "SearchParksByDistanceToUndergroundAgent.generated.hpp"

using namespace std;

namespace parks
{

class SearchParksByDistanceToUndergroundAgent : public ScAgent
{
  SC_CLASS(Agent, Event(ParksKeynodes::action_search_parks_by_distance_to_underground,
                        ScEvent::Type::AddOutputEdge))
  SC_GENERATED_BODY()
};

}
