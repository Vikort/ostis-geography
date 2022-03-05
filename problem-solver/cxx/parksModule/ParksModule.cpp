/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "ParksModule.hpp"

#include "agent/SearchParksByAreaAgent.hpp"
#include "agent/SearchParksByFoundingYearAgent.hpp"
#include "agent/SearchParksByDistanceToUndergroundAgent.hpp"
#include "keynodes/ParksKeynodes.hpp"

using namespace parks;

SC_IMPLEMENT_MODULE(ParksModule)

sc_result ParksModule::InitializeImpl()
{
  if (!ParksKeynodes::InitGlobal())
    return SC_RESULT_ERROR;

  SC_AGENT_REGISTER(SearchParksByAreaAgent)
  SC_AGENT_REGISTER(SearchParksByFoundingYearAgent)
  SC_AGENT_REGISTER(SearchParksByDistanceToUndergroundAgent)

  return SC_RESULT_OK;
}

sc_result ParksModule::ShutdownImpl()
{
  SC_AGENT_UNREGISTER(SearchParksByAreaAgent)
  return SC_RESULT_OK;
}
