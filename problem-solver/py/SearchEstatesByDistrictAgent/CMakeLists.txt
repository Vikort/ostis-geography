file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchEstatesByDistrictModule SHARED ${SOURCES})

target_include_directories(SearchEstatesByDistrictModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchEstatesByDistrictModule sc-memory)

add_dependencies(SearchEstatesByDistrictModule sc-memory)

sc_codegen(SearchEstatesByDistrictModule ${CMAKE_CURRENT_LIST_DIR})
