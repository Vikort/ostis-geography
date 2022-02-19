/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
#include "DrivingSchoolsModule.hpp"

SC_IMPLEMENT_MODULE(DrivingSchoolsModule)

sc_result DrivingSchoolsModule::InitializeImpl()
{
  m_DrivingSchoolsService.reset(new DrivingSchoolsPythonService("DrivingSchoolsModule/DrivingSchoolsModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_DrivingSchoolsService->Run();
  return SC_RESULT_OK;
}

sc_result DrivingSchoolsModule::ShutdownImpl()
{
  m_DrivingSchoolsService->Stop();
  m_DrivingSchoolsService.reset();
  return SC_RESULT_OK;
}
