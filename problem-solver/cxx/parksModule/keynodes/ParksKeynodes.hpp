/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#pragma once

#include <sc-memory/sc_addr.hpp>
#include <sc-memory/sc_object.hpp>

#include "ParksKeynodes.generated.hpp"

namespace parks
{

class ParksKeynodes : public ScObject
{
  SC_CLASS()
  SC_GENERATED_BODY()

public:

  SC_PROPERTY(Keynode("action_search_parks_by_area"), ForceCreate)
  static ScAddr action_search_parks_by_area;

  SC_PROPERTY(Keynode("action_search_parks_by_founding_year"), ForceCreate)
  static ScAddr action_search_parks_by_founding_year;

  SC_PROPERTY(Keynode("action_search_parks_by_distance_to_underground"), ForceCreate)
  static ScAddr action_search_parks_by_distance_to_underground;

  SC_PROPERTY(Keynode("concept_solution"), ForceCreate)
  static ScAddr concept_solution;

  SC_PROPERTY(Keynode("concept_success_solution"), ForceCreate)
  static ScAddr concept_success_solution;

  SC_PROPERTY(Keynode("concept_square"), ForceCreate)
  static ScAddr concept_square;

  SC_PROPERTY(Keynode("concept_year"), ForceCreate)
  static ScAddr concept_year;

  SC_PROPERTY(Keynode("concept_distance"), ForceCreate)
  static ScAddr concept_distance;

  SC_PROPERTY(Keynode("nrel_square"), ForceCreate)
  static ScAddr nrel_square;

  SC_PROPERTY(Keynode("nrel_founding_year"), ForceCreate)
  static ScAddr nrel_founding_year;

  SC_PROPERTY(Keynode("nrel_distance_to_nearest_metro_station"), ForceCreate)
  static ScAddr nrel_distance_to_nearest_metro_station;

  SC_PROPERTY(Keynode("concept_park"), ForceCreate)
  static ScAddr concept_park;
};

}
