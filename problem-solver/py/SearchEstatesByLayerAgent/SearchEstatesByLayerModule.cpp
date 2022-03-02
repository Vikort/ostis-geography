/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "SearchEstatesByLayerModule.hpp"

SC_IMPLEMENT_MODULE(SearchEstatesByLayerAgentModule)

sc_result SearchEstatesByLayerAgentModule::InitializeImpl()
{
  m_SearchEstatesByLayerService.reset(new SearchEstatesByLayerAgentPythonService("SearchEstatesByLayerAgent/SearchEstatesByLayerModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_SearchEstatesByLayerService->Run();
  return SC_RESULT_OK;
}

sc_result SearchEstatesByLayerAgentModule::ShutdownImpl()
{
  m_SearchEstatesByLayerService->Stop();
  m_SearchEstatesByLayerService.reset();
  return SC_RESULT_OK;
}
