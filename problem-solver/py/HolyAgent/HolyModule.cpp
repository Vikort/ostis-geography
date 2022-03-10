/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "HolyModule.hpp"

SC_IMPLEMENT_MODULE(HolyAgentModule)

sc_result HolyAgentModule::InitializeImpl()
{
  m_HolyService.reset(new HolyAgentPythonService("HolyAgent/HolyModule.py"));
  m_HolyService->Run();
  return SC_RESULT_OK;
}

sc_result HolyAgentModule::ShutdownImpl()
{
  m_HolyService->Stop();
  m_HolyService.reset();
  return SC_RESULT_OK;
}
