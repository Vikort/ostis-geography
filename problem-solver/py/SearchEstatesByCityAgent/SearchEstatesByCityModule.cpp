/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "SearchEstatesByCityModule.hpp"

SC_IMPLEMENT_MODULE(SearchEstatesByCityAgentModule)

sc_result SearchEstatesByCityAgentModule::InitializeImpl()
{
  m_SearchEstatesByCityService.reset(new SearchEstatesByCityAgentPythonService("SearchEstatesByCityAgent/SearchEstatesByCityModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_SearchEstatesByCityService->Run();
  return SC_RESULT_OK;
}

sc_result SearchEstatesByCityAgentModule::ShutdownImpl()
{
  m_SearchEstatesByCityService->Stop();
  m_SearchEstatesByCityService.reset();
  return SC_RESULT_OK;
}
