file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchEstatesByCityModule SHARED ${SOURCES})

target_include_directories(SearchEstatesByCityModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchEstatesByCityModule sc-memory)

add_dependencies(SearchEstatesByCityModule sc-memory)

sc_codegen(SearchEstatesByCityModule ${CMAKE_CURRENT_LIST_DIR})
