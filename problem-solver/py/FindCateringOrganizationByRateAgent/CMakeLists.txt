file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindCateringOrganizationByRateModule SHARED ${SOURCES})

target_include_directories(FindCateringOrganizationByRateModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindCateringOrganizationByRateModule sc-memory)

add_dependencies(FindCateringOrganizationByRateModule sc-memory)

sc_codegen(FindCateringOrganizationByRateModule ${CMAKE_CURRENT_LIST_DIR})
