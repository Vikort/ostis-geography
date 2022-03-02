/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "SearchEstatesByRegionModule.hpp"

SC_IMPLEMENT_MODULE(SearchEstatesByRegionAgentModule)

sc_result SearchEstatesByRegionAgentModule::InitializeImpl()
{
  m_SearchEstatesByRegionService.reset(new SearchEstatesByRegionAgentPythonService("SearchEstatesByRegionAgent/SearchEstatesByRegionModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_SearchEstatesByRegionService->Run();
  return SC_RESULT_OK;
}

sc_result SearchEstatesByRegionAgentModule::ShutdownImpl()
{
  m_SearchEstatesByRegionService->Stop();
  m_SearchEstatesByRegionService.reset();
  return SC_RESULT_OK;
}
