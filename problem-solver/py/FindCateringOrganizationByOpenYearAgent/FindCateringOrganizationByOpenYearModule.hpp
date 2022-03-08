#pragma once

#include "sc-memory/sc_module.hpp"
#include "FindCateringOrganizationByOpenYearService.hpp"
#include "FindCateringOrganizationByOpenYearModule.generated.hpp"


class FindCateringOrganizationByOpenYearAgentModule : public ScModule
{
  SC_CLASS(LoadOrder(1000))
  SC_GENERATED_BODY()

  virtual sc_result InitializeImpl() override;
  virtual sc_result ShutdownImpl() override;

private:
  std::unique_ptr<FindCateringOrganizationByOpenYearAgentPythonService> m_FindCateringOrganizationByOpenYearService;
};
