/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "ParksKeynodes.hpp"

#include <sc-memory/sc_memory.hpp>

namespace parks
{

ScAddr ParksKeynodes::action_search_parks_by_area;
ScAddr ParksKeynodes::action_search_parks_by_founding_year;
ScAddr ParksKeynodes::action_search_parks_by_distance_to_underground;
ScAddr ParksKeynodes::concept_solution;
ScAddr ParksKeynodes::concept_success_solution;
ScAddr ParksKeynodes::concept_square;
ScAddr ParksKeynodes::concept_year;
ScAddr ParksKeynodes::concept_distance;
ScAddr ParksKeynodes::nrel_square;
ScAddr ParksKeynodes::nrel_founding_year;
ScAddr ParksKeynodes::nrel_distance_to_nearest_metro_station;
ScAddr ParksKeynodes::concept_park;

}
