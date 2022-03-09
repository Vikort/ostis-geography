/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "CustomModule.hpp"

SC_IMPLEMENT_MODULE(CustomAgentModule)

sc_result CustomAgentModule::InitializeImpl()
{
  m_CustomService.reset(new CustomAgentPythonService("CustomAgent/CustomModule.py"));
  m_CustomService->Run();
  return SC_RESULT_OK;
}

sc_result CustomAgentModule::ShutdownImpl()
{
  m_CustomService->Stop();
  m_CustomService.reset();
  return SC_RESULT_OK;
}
